# ForgeCoordination

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:49.682124Z
**Run ID**: RUN-096
**Seed**: 1700000096

---

## Architecture

- Architecture: centralized_leader
- Node Type: heterogeneous
- Quorum Type: flexible

## Leader Election

- Method: lease_based
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: hierarchical_quorum
- Vote Granting: grant_based_on_priority
- Vote Revocations: True

## Log Replication

- Type: state_machine
- Structure: linked_list
- Commit Method: majority_commit

## Recovery

- Strategy: log_catchup
- Snapshot Policy: size_based

## Membership

- Model: remove_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: gossip
- Model: byzantine

## Timing

- Timeout Model: randomized
- Heartbeat Interval: 63ms
- Election Timeout Base: 235ms
- Election Timeout Range: 163ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- leader_announce
- term_update

## State Machine

- Type: deterministic
- Safety: True
- Liveness: False

---

## Discovered Features

- leader_election:lease_based
- concept:term_epochs
- voting:hierarchical_quorum
- vote_granting:grant_based_on_priority
- concept:vote_revocations
- log:state_machine
- log_structure:linked_list
- commit:majority_commit
- recovery:log_catchup
- snapshot:size_based
- dynamic_membership:remove_node
- failure_detection:gossip
- concept:randomized_election_timeout

---

## Simulation Results

### 3 Nodes

- Election Attempts: 57
- Elections Succeeded: 50
- Election Success Rate: 87.72%
- Messages Sent: 210
- Commits: 27
- Avg Messages/Commit: 7.78
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 55
- Elections Succeeded: 44
- Election Success Rate: 80.00%
- Messages Sent: 262
- Commits: 14
- Avg Messages/Commit: 18.71
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 44
- Elections Succeeded: 43
- Election Success Rate: 97.73%
- Messages Sent: 385
- Commits: 25
- Avg Messages/Commit: 15.40
- Leader Changes: 43
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 63
- Elections Succeeded: 63
- Election Success Rate: 100.00%
- Messages Sent: 712
- Commits: 32
- Avg Messages/Commit: 22.25
- Leader Changes: 63
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

