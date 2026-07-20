# StratumConsensus

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:46.174622Z
**Run ID**: RUN-029
**Seed**: 1700000029

---

## Architecture

- Architecture: decentralized
- Node Type: heterogeneous
- Quorum Type: weighted

## Leader Election

- Method: timestamp_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: hierarchical_quorum
- Vote Granting: grant_based_on_priority
- Vote Revocations: True

## Log Replication

- Type: replicated_log
- Structure: append_only_array
- Commit Method: pipeline_commit

## Recovery

- Strategy: log_catchup
- Snapshot Policy: size_based

## Membership

- Model: single_config
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: explicit_probe
- Model: timing

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 339ms
- Election Timeout Base: 183ms
- Election Timeout Range: 142ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:timestamp_based
- concept:term_epochs
- concept:randomized_timeout
- voting:hierarchical_quorum
- vote_granting:grant_based_on_priority
- concept:vote_revocations
- log:replicated_log
- log_structure:append_only_array
- commit:pipeline_commit
- recovery:log_catchup
- snapshot:size_based
- dynamic_membership:single_config
- failure_detection:explicit_probe

---

## Simulation Results

### 3 Nodes

- Election Attempts: 59
- Elections Succeeded: 47
- Election Success Rate: 79.66%
- Messages Sent: 210
- Commits: 14
- Avg Messages/Commit: 15.00
- Leader Changes: 47
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 54
- Elections Succeeded: 44
- Election Success Rate: 81.48%
- Messages Sent: 308
- Commits: 19
- Avg Messages/Commit: 16.21
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 52
- Elections Succeeded: 49
- Election Success Rate: 94.23%
- Messages Sent: 439
- Commits: 15
- Avg Messages/Commit: 29.27
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 57
- Elections Succeeded: 50
- Election Success Rate: 87.72%
- Messages Sent: 415
- Commits: 23
- Avg Messages/Commit: 18.04
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

